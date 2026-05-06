'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const IS = { width: '100%', padding: '10px 13px', borderRadius: 8, background: '#0d1020', border: '1px solid #2a304a', color: '#f0ebe0', boxSizing: 'border-box' as const, fontSize: 13, fontFamily: 'inherit', outline: 'none' };
const LS = { display: 'block', fontSize: 11, fontWeight: 600, color: '#8892aa', textTransform: 'uppercase' as const, letterSpacing: '.05em', margin: '0 0 5px' };

type Passo = 'upload' | 'confirmar' | 'relato' | 'gerar' | 'concluido';

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [perfil, setPerfil] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarAberta, setSidebarAberta] = useState(false);
    const [historicoAberto, setHistoricoAberto] = useState(false);

    // Fluxo de geração
    const [passo, setPasso] = useState<Passo>('upload');
    const [ficheiro, setFicheiro] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [dadosAuto, setDadosAuto] = useState<any>({});
    const [relato, setRelato] = useState('');
    const [gerandoDefesa, setGerandoDefesa] = useState(false);
    const [defesaGerada, setDefesaGerada] = useState('');
    const [erro, setErro] = useState('');
    const [defesas, setDefesas] = useState<any[]>([]);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) { window.location.href = '/login'; return; }
            setUser(session.user);
            const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
            if (data) setPerfil(data);
            else {
                const meta = session.user.user_metadata || {};
                setPerfil({ nome: meta.nome || session.user.email, nif: meta.nif, carta_conducao: meta.carta_conducao, telemovel: meta.telemovel, morada: meta.morada });
            }
            const { data: hist } = await supabase.from('defesas').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false }).limit(20);
            setDefesas(hist || []);
            setLoading(false);
        })();
    }, []);

    const handleFicheiro = async (f: File) => {
        setFicheiro(f);
        setErro('');
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string || '');
        reader.readAsDataURL(f);
    };

    const extrairDados = async () => {
        if (!ficheiro) return;
        setUploadLoading(true); setErro('');
        try {
            const reader = new FileReader();
            const base64 = await new Promise<string>((res, rej) => {
                reader.onload = (e) => res((e.target?.result as string).split(',')[1]);
                reader.onerror = rej;
                reader.readAsDataURL(ficheiro);
            });
            const r = await fetch('/api/extrair-auto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ base64, mimeType: ficheiro.type }),
            });
            const { dados, error } = await r.json();
            if (error) throw new Error(error);
            setDadosAuto(dados || {});
            setPasso('confirmar');
        } catch (e: any) {
            setErro('Não foi possível extrair os dados. Preencha manualmente.');
            setDadosAuto({});
            setPasso('confirmar');
        }
        setUploadLoading(false);
    };

    const gerarDefesa = async () => {
        setGerandoDefesa(true); setErro('');
        try {
            const r = await fetch('/api/gerar-defesa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dadosAuto, dadosArguido: perfil, relato, userId: user?.id }),
            });
            const { defesa, error } = await r.json();
            if (error) throw new Error(error);
            setDefesaGerada(defesa);
            setPasso('concluido');
            const { data: hist } = await supabase.from('defesas').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20);
            setDefesas(hist || []);
        } catch (e: any) {
            setErro('Erro ao gerar a defesa: ' + (e.message || 'Tente novamente.'));
        }
        setGerandoDefesa(false);
    };

    const transferirDefesa = () => {
        const blob = new Blob(['﻿' + defesaGerada], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `defesa-${dadosAuto?.matricula || 'auto'}-${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const reiniciar = () => {
        setPasso('upload'); setFicheiro(null); setPreview('');
        setDadosAuto({}); setRelato(''); setDefesaGerada(''); setErro('');
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', background: '#0b0e18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#0b0e18', color: '#f0ebe0', display: 'flex', flexDirection: 'column' }}>

            {/* ── HEADER ── */}
            <header style={{ background: '#0d1020', borderBottom: '1px solid #1e2540', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button onClick={() => setSidebarAberta(s => !s)} style={{ background: 'none', border: 'none', color: '#8892aa', cursor: 'pointer', fontSize: 20, padding: '4px 8px', display: 'flex', alignItems: 'center' }}>☰</button>
                    <span style={{ fontWeight: 800, fontSize: 16 }}>
                        <span style={{ color: '#c9973e' }}>TEM</span> Defesa
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13, color: '#8892aa' }}>{perfil?.nome?.split(' ')[0] || user?.email}</span>
                    <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/'; }}
                        style={{ padding: '6px 14px', borderRadius: 8, fontSize: 13, background: 'transparent', border: '1px solid #2a304a', color: '#8892aa', cursor: 'pointer' }}>
                        Sair
                    </button>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1 }}>

                {/* ── SIDEBAR ── */}
                {sidebarAberta && (
                    <aside style={{ width: 240, background: '#0d1020', borderRight: '1px solid #1e2540', padding: '20px 0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                        {[
                            { icon: '➕', label: 'Nova Defesa', action: reiniciar },
                            { icon: '📋', label: 'Histórico', action: () => setHistoricoAberto(h => !h) },
                        ].map(({ icon, label, action }) => (
                            <button key={label} onClick={action}
                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', background: 'none', border: 'none', color: '#c0cce0', cursor: 'pointer', fontSize: 14, textAlign: 'left', width: '100%' }}>
                                <span>{icon}</span> {label}
                            </button>
                        ))}
                        <div style={{ margin: '12px 16px', height: 1, background: '#1e2540' }} />
                        <Link href="/como-recorrer" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', color: '#8892aa', fontSize: 13, textDecoration: 'none' }}>
                            ⚖️ Como Recorrer
                        </Link>
                    </aside>
                )}

                {/* ── CONTEÚDO PRINCIPAL ── */}
                <main style={{ flex: 1, padding: '32px 24px', maxWidth: 860, margin: '0 auto', width: '100%' }}>

                    {/* Histórico */}
                    {historicoAberto && (
                        <div style={{ marginBottom: 28, background: '#111526', border: '1px solid #1e2540', borderRadius: 14, padding: '20px 22px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>📋 Histórico de Defesas</h3>
                                <button onClick={() => setHistoricoAberto(false)} style={{ background: 'none', border: 'none', color: '#8892aa', cursor: 'pointer', fontSize: 18 }}>✕</button>
                            </div>
                            {defesas.length === 0
                                ? <p style={{ color: '#8892aa', fontSize: 13 }}>Ainda não gerou nenhuma defesa.</p>
                                : defesas.map((d: any) => (
                                    <div key={d.id} style={{ borderTop: '1px solid #1e2540', paddingTop: 12, marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                        <div>
                                            <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 600 }}>{d.dados_auto?.infracao || 'Contraordenação'} — {d.dados_auto?.matricula || '—'}</p>
                                            <p style={{ margin: 0, fontSize: 12, color: '#8892aa' }}>{new Date(d.created_at).toLocaleDateString('pt-PT')} · {d.dados_auto?.autoridade || '—'}</p>
                                        </div>
                                        <button onClick={() => { setDefesaGerada(d.texto_defesa_final || ''); setDadosAuto(d.dados_auto || {}); setPasso('concluido'); setHistoricoAberto(false); }}
                                            style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, background: 'rgba(201,151,62,.12)', border: '1px solid rgba(201,151,62,.3)', color: '#c9973e', cursor: 'pointer' }}>
                                            Ver defesa
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    )}

                    {/* ── INDICADOR DE PASSOS ── */}
                    {passo !== 'concluido' && (
                        <div style={{ display: 'flex', gap: 6, marginBottom: 28, alignItems: 'center' }}>
                            {(['upload', 'confirmar', 'relato', 'gerar'] as Passo[]).map((p, i) => {
                                const labels: Record<string, string> = { upload: 'Documento', confirmar: 'Dados', relato: 'Relato', gerar: 'Gerar' };
                                const ativo = p === passo;
                                const feito = ['upload', 'confirmar', 'relato', 'gerar'].indexOf(p) < ['upload', 'confirmar', 'relato', 'gerar'].indexOf(passo);
                                return (
                                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {i > 0 && <div style={{ width: 24, height: 1, background: feito ? '#c9973e' : '#2a304a' }} />}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: feito ? '#c9973e' : ativo ? 'rgba(201,151,62,.2)' : '#151b2e', border: `1.5px solid ${ativo || feito ? '#c9973e' : '#2a304a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: feito ? '#0b0e18' : ativo ? '#c9973e' : '#4a5060' }}>
                                                {feito ? '✓' : i + 1}
                                            </div>
                                            <span style={{ fontSize: 12, color: ativo ? '#f0ebe0' : feito ? '#c9973e' : '#4a5060', fontWeight: ativo ? 600 : 400 }}>{labels[p]}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {erro && (
                        <div style={{ marginBottom: 20, padding: '12px 16px', borderRadius: 10, background: 'rgba(224,80,80,.1)', border: '1px solid rgba(224,80,80,.25)', color: '#e05050', fontSize: 13 }}>
                            ⚠️ {erro}
                        </div>
                    )}

                    {/* ── PASSO 1: UPLOAD ── */}
                    {passo === 'upload' && (
                        <div style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '32px 24px' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>📄 Carregue o auto de contraordenação</h2>
                            <p style={{ color: '#8892aa', fontSize: 13, marginBottom: 24 }}>Aceita imagem (JPG, PNG) ou PDF. A IA extrai os dados automaticamente.</p>

                            <div
                                onClick={() => fileRef.current?.click()}
                                onDragOver={e => e.preventDefault()}
                                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFicheiro(f); }}
                                style={{ border: '2px dashed #2a304a', borderRadius: 12, padding: '40px 24px', textAlign: 'center', cursor: 'pointer', transition: 'border-color .2s', background: '#0d1020' }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = '#c9973e')}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a304a')}>
                                {ficheiro
                                    ? <><p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>✅ {ficheiro.name}</p><p style={{ fontSize: 12, color: '#8892aa' }}>Clique para substituir</p></>
                                    : <><p style={{ fontSize: 32, marginBottom: 10 }}>📎</p><p style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Arrastar o ficheiro aqui ou clicar para selecionar</p><p style={{ fontSize: 12, color: '#8892aa' }}>JPG, PNG ou PDF · máx. 10 MB</p></>
                                }
                            </div>
                            <input ref={fileRef} type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) handleFicheiro(e.target.files[0]); }} />

                            {preview && ficheiro?.type.startsWith('image/') && (
                                <img src={preview} alt="Pré-visualização" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8, marginTop: 16, objectFit: 'contain', border: '1px solid #2a304a' }} />
                            )}

                            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                                <button onClick={extrairDados} disabled={!ficheiro || uploadLoading}
                                    style={{ flex: 1, minWidth: 160, padding: '12px 20px', borderRadius: 10, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 14, border: 'none', cursor: ficheiro && !uploadLoading ? 'pointer' : 'not-allowed', opacity: !ficheiro || uploadLoading ? .6 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    {uploadLoading ? <><span className="spinner" style={{ borderTopColor: '#0b0e18', borderColor: 'rgba(0,0,0,.2)' }} /> A extrair dados...</> : '🤖 Extrair dados com IA'}
                                </button>
                                <button onClick={() => { setDadosAuto({}); setPasso('confirmar'); }}
                                    style={{ padding: '12px 20px', borderRadius: 10, background: 'transparent', border: '1px solid #2a304a', color: '#8892aa', fontSize: 14, cursor: 'pointer' }}>
                                    Preencher manualmente
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── PASSO 2: CONFIRMAR DADOS ── */}
                    {passo === 'confirmar' && (
                        <div style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '32px 24px' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>✏️ Confirme os dados do auto</h2>
                            <p style={{ color: '#8892aa', fontSize: 13, marginBottom: 24 }}>Verifique e corrija os campos extraídos pela IA se necessário.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                {[
                                    { label: 'Autoridade', key: 'autoridade', placeholder: 'ANSR / GNR / PSP / Câmara' },
                                    { label: 'N.º do Auto', key: 'numeroAuto', placeholder: 'Ex: 10/2025/123456' },
                                    { label: 'Data da Infração', key: 'data', placeholder: 'AAAA-MM-DD', type: 'date' },
                                    { label: 'Hora', key: 'hora', placeholder: 'HH:MM' },
                                    { label: 'Matrícula', key: 'matricula', placeholder: 'Ex: 50-AB-12' },
                                    { label: 'Veículo (Marca/Modelo)', key: 'marca', placeholder: 'Ex: Volkswagen Golf' },
                                    { label: 'Local da Infração', key: 'local', placeholder: 'Rua / Estrada / IP...' },
                                    { label: 'Localidade', key: 'localidade', placeholder: 'Ex: Lisboa' },
                                ].map(({ label, key, placeholder, type }) => (
                                    <div key={key}>
                                        <label style={LS}>{label}</label>
                                        <input style={IS} type={type || 'text'} value={dadosAuto[key] || ''} placeholder={placeholder}
                                            onChange={e => setDadosAuto((d: any) => ({ ...d, [key]: e.target.value }))} />
                                    </div>
                                ))}
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={LS}>Descrição da Infração</label>
                                    <input style={IS} value={dadosAuto.infracao || ''} placeholder="Ex: Excesso de velocidade, uso de telemóvel..."
                                        onChange={e => setDadosAuto((d: any) => ({ ...d, infracao: e.target.value }))} />
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={LS}>Artigo infringido (CE/RGCO)</label>
                                    <input style={IS} value={dadosAuto.artigoLE || ''} placeholder="Ex: Art. 27.º-A, n.º 2 do CE"
                                        onChange={e => setDadosAuto((d: any) => ({ ...d, artigoLE: e.target.value }))} />
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={LS}>Detalhes técnicos <span style={{ fontWeight: 400, opacity: .7 }}>(velocidade, equipamento, etc.)</span></label>
                                    <input style={IS} value={dadosAuto.detalhes || ''} placeholder="Ex: 95 km/h em zona de 50 km/h, radar fixo"
                                        onChange={e => setDadosAuto((d: any) => ({ ...d, detalhes: e.target.value }))} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                                <button onClick={() => setPasso('upload')} style={{ padding: '12px 20px', borderRadius: 10, background: 'transparent', border: '1px solid #2a304a', color: '#8892aa', fontSize: 14, cursor: 'pointer' }}>← Voltar</button>
                                <button onClick={() => setPasso('relato')} disabled={!dadosAuto.autoridade || !dadosAuto.infracao}
                                    style={{ flex: 1, padding: '12px 20px', borderRadius: 10, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', opacity: !dadosAuto.autoridade || !dadosAuto.infracao ? .5 : 1 }}>
                                    Continuar →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── PASSO 3: RELATO ── */}
                    {passo === 'relato' && (
                        <div style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '32px 24px' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>💬 Descreva o que aconteceu</h2>
                            <p style={{ color: '#8892aa', fontSize: 13, marginBottom: 20 }}>O seu relato é a base da defesa. Seja específico sobre as circunstâncias, a sinalização, o local, o equipamento utilizado pela autoridade e qualquer detalhe relevante.</p>

                            <textarea value={relato} onChange={e => setRelato(e.target.value)} rows={10}
                                placeholder="Exemplo: Na data indicada, conduzia o meu veículo pela [rua/estrada] a velocidade adequada e segura. O limite de velocidade não se encontrava devidamente sinalizado antes do ponto de medição. O equipamento radar não se encontrava identificado com qualquer sinalização. Não me foi possível verificar a certificação do aparelho..."
                                style={{ ...IS, resize: 'vertical', lineHeight: 1.6 }} />

                            <div style={{ background: '#0d1020', border: '1px solid #1e2540', borderRadius: 8, padding: '12px 14px', marginTop: 14 }}>
                                <p style={{ fontSize: 12, color: '#8892aa', margin: '0 0 8px', fontWeight: 600 }}>💡 Pontos a mencionar (se aplicável):</p>
                                <ul style={{ fontSize: 12, color: '#6a7490', margin: 0, padding: '0 0 0 16px', lineHeight: 1.8 }}>
                                    <li>Ausência ou irregularidade de sinalização no local</li>
                                    <li>Visibilidade reduzida, condições atmosféricas adversas</li>
                                    <li>Estado do equipamento de medição (visível? sinalizado?)</li>
                                    <li>Circunstâncias excecionais (emergência, avaria, etc.)</li>
                                    <li>Identificação do condutor real (se não era o proprietário)</li>
                                </ul>
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                                <button onClick={() => setPasso('confirmar')} style={{ padding: '12px 20px', borderRadius: 10, background: 'transparent', border: '1px solid #2a304a', color: '#8892aa', fontSize: 14, cursor: 'pointer' }}>← Voltar</button>
                                <button onClick={gerarDefesa} disabled={!relato.trim() || gerandoDefesa}
                                    style={{ flex: 1, padding: '12px 20px', borderRadius: 10, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', opacity: !relato.trim() || gerandoDefesa ? .5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    {gerandoDefesa ? <><span className="spinner" style={{ borderTopColor: '#0b0e18', borderColor: 'rgba(0,0,0,.2)' }} /> A elaborar defesa...</> : '⚖️ Gerar defesa com IA'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── PASSO 4: GERAR ── */}
                    {passo === 'gerar' && (
                        <div style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '48px 24px', textAlign: 'center' }}>
                            <span className="spinner" style={{ width: 40, height: 40, borderWidth: 4, display: 'block', margin: '0 auto 20px' }} />
                            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>A elaborar a sua defesa...</h2>
                            <p style={{ color: '#8892aa', fontSize: 13 }}>A IA está a analisar o auto e a construir os argumentos jurídicos com base no Código da Estrada e no RGCO.</p>
                        </div>
                    )}

                    {/* ── CONCLUÍDO ── */}
                    {passo === 'concluido' && defesaGerada && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ background: 'rgba(74,170,106,.1)', border: '1px solid rgba(74,170,106,.25)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 24 }}>✅</span>
                                <div>
                                    <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 15, color: '#4aaa6a' }}>Defesa gerada com sucesso</p>
                                    <p style={{ margin: 0, fontSize: 13, color: '#8892aa' }}>Reveja o documento e transfira-o para submeter à autoridade autuante.</p>
                                </div>
                            </div>

                            <div style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>📄 Defesa Administrativa</h3>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button onClick={transferirDefesa} style={{ padding: '8px 18px', borderRadius: 8, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer' }}>
                                            ⬇️ Transferir .txt
                                        </button>
                                        <button onClick={reiniciar} style={{ padding: '8px 18px', borderRadius: 8, background: 'transparent', border: '1px solid #2a304a', color: '#8892aa', fontSize: 13, cursor: 'pointer' }}>
                                            ➕ Nova defesa
                                        </button>
                                    </div>
                                </div>
                                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 13, color: '#c0cce0', lineHeight: 1.7, maxHeight: 500, overflowY: 'auto', margin: 0, padding: '16px', background: '#0d1020', borderRadius: 10, border: '1px solid #1e2540' }}>
                                    {defesaGerada}
                                </pre>
                            </div>

                            <div style={{ background: '#111526', border: '1px solid rgba(201,151,62,.2)', borderRadius: 12, padding: '16px 20px' }}>
                                <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 14, color: '#c9973e' }}>⚠️ Como submeter a defesa</p>
                                <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: '#8892aa', lineHeight: 1.8 }}>
                                    <li><strong>Prazo:</strong> 15 dias úteis a contar da data de notificação do auto</li>
                                    <li><strong>Online:</strong> Portal ePortugal.gov.pt → ANSR → Defesa/Impugnação</li>
                                    <li><strong>Correio:</strong> Carta registada com aviso de receção para a ANSR ou autoridade autuante</li>
                                    <li><strong>Presencialmente:</strong> Balcão da entidade autuante (ANSR, GNR, PSP, Câmara)</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Overlay sidebar mobile */}
            {sidebarAberta && <div onClick={() => setSidebarAberta(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 90 }} />}
        </div>
    );
}
